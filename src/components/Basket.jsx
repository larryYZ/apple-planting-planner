import React from 'react';

export default function Basket(props) {
  const {cartItems, onRemove} = props;
  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart Is Empty</div>}
        {cartItems.map((tree) => (
            <p><button onClick={() => onRemove(tree)} className="add-button">-</button> {tree.variety}</p>
        ))}
      </div>
    </aside>
  );
}