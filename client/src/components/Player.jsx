import React from 'react';
import '../styles.css';
import Card from './Card';

export default function Player({ data }) {
  return (
    <div className='player'>
      <span className='value'>{data.name}:</span>
      <Card data = {data.cards[0]}/>
      <Card data = {data.cards[1]}/>
      <span className='value'>{data.stack}</span>
    </div>
  );
}