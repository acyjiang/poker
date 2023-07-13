import React from 'react';
import '../App.css';
import Card from './Card';

export default function Player() {
  return (
    <div className='player'>
      <Card/>
      <Card/>
    </div>
  );
}