/* Story Blocks - GA4 ecommerce event helpers.
   Thin wrappers around gtag() that turn the basket/SKUs into GA4 `items`, so
   the Monetization reports and funnel explorations light up:
     view_item -> add_to_cart -> view_cart -> begin_checkout -> purchase
   Analytics storage stays gated by Consent Mode (set in each page's <head>);
   these helpers just queue events on the dataLayer. */
import { SKUS } from './core.js';

function gtag() { (window.dataLayer = window.dataLayer || []).push(arguments); }
const round2 = (n) => Math.round(n * 100) / 100;

/* One GA4 line item for a SKU + quantity. */
export function skuItem(sku, quantity = 1) {
  const s = SKUS[sku];
  if (!s) return null;
  return {
    item_id: sku,
    item_name: s.name,
    item_brand: 'Story Blocks',
    item_category: 'Journal',
    item_variant: sku.startsWith('gold') ? 'Gold Edition' : 'Standard Edition',
    price: s.price,
    quantity,
  };
}

function basketItems(basket) {
  return Object.entries(basket || {})
    .filter(([, q]) => q > 0)
    .map(([sku, q]) => skuItem(sku, q))
    .filter(Boolean);
}
function itemsValue(items) { return round2(items.reduce((s, i) => s + i.price * i.quantity, 0)); }

export function viewItem(sku) {
  const it = skuItem(sku, 1);
  if (!it) return;
  gtag('event', 'view_item', { currency: 'GBP', value: it.price, items: [it] });
}

export function addToCart(sku, quantity = 1) {
  const it = skuItem(sku, quantity);
  if (!it) return;
  gtag('event', 'add_to_cart', { currency: 'GBP', value: round2(it.price * quantity), items: [it] });
}

export function removeFromCart(sku, quantity = 1) {
  const it = skuItem(sku, quantity);
  if (!it) return;
  gtag('event', 'remove_from_cart', { currency: 'GBP', value: round2(it.price * quantity), items: [it] });
}

export function viewCart(basket) {
  const items = basketItems(basket);
  if (!items.length) return;
  gtag('event', 'view_cart', { currency: 'GBP', value: itemsValue(items), items });
}

/* Fire begin_checkout AND stash the basket so /thanks can report the purchase
   after the visitor comes back from Stripe. sessionStorage survives the
   round-trip to Stripe and back (same tab, same origin on return). */
export function beginCheckout(basket) {
  const items = basketItems(basket);
  if (!items.length) return;
  const value = itemsValue(items);
  const tx = 'sb-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  try { sessionStorage.setItem('sb_ga_pending', JSON.stringify({ items, value, tx })); } catch (e) {}
  gtag('event', 'begin_checkout', { currency: 'GBP', value, items });
}

/* On /thanks: report the purchase from the stashed basket, keyed by the Stripe
   session id (passed through the success URL) so a refresh never double-counts. */
export function purchaseFromPending(sessionId) {
  let p = null;
  try { p = JSON.parse(sessionStorage.getItem('sb_ga_pending') || 'null'); } catch (e) {}
  if (!p || !p.items || !p.items.length) return;
  const txId = sessionId || p.tx;
  const firedKey = 'sb_ga_purchased_' + txId;
  try { if (localStorage.getItem(firedKey)) return; } catch (e) {}
  gtag('event', 'purchase', { transaction_id: txId, currency: 'GBP', value: p.value, shipping: 0, items: p.items });
  try { localStorage.setItem(firedKey, '1'); sessionStorage.removeItem('sb_ga_pending'); } catch (e) {}
}
