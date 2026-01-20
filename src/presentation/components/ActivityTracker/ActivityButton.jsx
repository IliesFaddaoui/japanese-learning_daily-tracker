import React from 'react';
import { Button } from '../ui/button';

export const ActivityButton = ({ type, label, onClick }) => {
  return (
    <Button
      variant="default"
      size="lg"
      className="w-full"
      data-activity={type}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
