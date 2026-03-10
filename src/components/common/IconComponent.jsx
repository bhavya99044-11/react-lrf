import React from 'react'
import icons from '../../assets/svg'

const IconComponent = ({icon,className}) => {

    const Icon = icons[icon];

      if (!Icon) return null;

  return <img src={Icon} className={className}/>
}

export default IconComponent