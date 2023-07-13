import React from 'react';
import '../styles.css';

export default function Card({data}) {
  return (
    <div className="card">
      <span className="value">{data}</span>
    </div>
  );
}