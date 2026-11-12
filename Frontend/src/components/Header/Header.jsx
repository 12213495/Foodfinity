import React from 'react'
import style from './header.module.css'

const Header = () => {
  return (
    <div className={style.header}>
        <div className={style.headerContent}>
            <h2>Order your faourite food here</h2>
            <p>Craving something delicious? We've got you covered! Enjoy your favorite
               meals from the best restaurants, freshly prepared and delivered straight to your doorstep.</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header