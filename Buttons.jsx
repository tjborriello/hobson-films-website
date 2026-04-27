/* global React */
const { useState, useEffect } = React;

function PrimaryBtn({ children, onClick, type, sm, ...p }) {
  return <button type={type || 'button'} onClick={onClick} className={`hf-btn hf-btn--primary${sm ? ' hf-btn--sm' : ''}`} {...p}>{children}</button>;
}
function OutlineBtn({ children, onClick, dark, sm, type, ...p }) {
  return <button type={type || 'button'} onClick={onClick} className={`hf-btn hf-btn--outline${dark ? ' hf-btn--outline-dark' : ''}${sm ? ' hf-btn--sm' : ''}`} {...p}>{children}</button>;
}
function GhostBtn({ children, onClick, sm, ...p }) {
  return <button type="button" onClick={onClick} className={`hf-btn hf-btn--ghost${sm ? ' hf-btn--sm' : ''}`} {...p}>{children}</button>;
}
function LinkArrow({ children, onClick, accent, light }) {
  return <button type="button" onClick={onClick} className={`hf-link-arrow${accent ? ' hf-link-arrow--accent' : ''}${light ? ' hf-link-arrow--light' : ''}`}>{children} <span className="arrow">→</span></button>;
}
window.PrimaryBtn = PrimaryBtn;
window.OutlineBtn = OutlineBtn;
window.GhostBtn = GhostBtn;
window.LinkArrow = LinkArrow;
