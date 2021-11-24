import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';

export default function Icon({ name, size = 24, color, type, mr = 0, ml = 0 }) {
  switch (type) {
    case 'material-icons':
      return (
        <MaterialIcons
          name={name}
          size={size}
          color={color}
          style={{ marginRight: mr, marginLeft: ml }}
        />
      );
    default:
      return <MaterialIcons name={name} size={size} color={color} />;
  }
}
