import { useContext, useState } from "react";
import style from "../Navbar/navbar.module.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);

  const { getTotalCartAmount, token, setToken, search, setSearch } = useContext(StoreContext)

  const navigate = useNavigate()
  const location = useLocation()

  const Logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  // Go to a section of the home page: updates the URL (/#id) and scrolls to it
  const jumpTo = (id) => {
    const fromOtherPage = location.pathname !== "/"
    navigate({ pathname: "/", hash: `#${id}` })
    setTimeout(() => scrollTo(id), fromOtherPage ? 150 : 0)
  }

  const goToSection = (id, name) => {
    setMenu(name)
    jumpTo(id)
  }

  const goToResults = () => {
    jumpTo("fooddisplay")
  }

  const onSearchIconClick = () => {
    if (!showSearch) {
      setShowSearch(true)
    } else if (search.trim()) {
      goToResults()
    } else {
      setShowSearch(false)
    }
  }

  return (
    <div className={style.Navbar}>
      <Link to="/"><img src={assets.logo} className={style.logo} /></Link>
      <ul className={style.navbarMenu}>
        <Link
          to="/"
          className={menu === "home" ? style.active : ""}
          onClick={() => setMenu("home")}
        >
          home
        </Link>
        <a
          href="#ExploreMenu"
          className={menu === "menu" ? style.active : ""}
          onClick={(e) => { e.preventDefault(); goToSection("ExploreMenu", "menu") }}
        >
          menu
        </a>
        <a
          href="#AppDownload"
          className={menu === "mobile-app" ? style.active : ""}
          onClick={(e) => { e.preventDefault(); goToSection("AppDownload", "mobile-app") }}
        >
          mobile-app
        </a>
        <a
          href="#Footer"
          className={menu === "contact-us" ? style.active : ""}
          onClick={(e) => { e.preventDefault(); goToSection("Footer", "contact-us") }}
        >
          contact us
        </a>
      </ul>
      <div className={style.navbarRight}>
        <div className={`${style.searchBox} ${showSearch ? style.searchOpen : ""}`}>
          {showSearch && (
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goToResults()}
              autoFocus
            />
          )}
          {showSearch && search && (
            <span className={style.clearSearch} onClick={() => setSearch("")}>×</span>
          )}
          <img src={assets.search_icon} onClick={onSearchIconClick} style={{ cursor: "pointer" }} />
        </div>
        <div className={style.searchIcon}>
          <Link to='/cart'>
            <img src={assets.basket_icon} />
          </Link>
          <div className={getTotalCartAmount() ? style.dot : ""}></div>
        </div>
        {!token ? <button
          onClick={() => {
            setShowLogin(true);
          }}
        >
          Sign in
        </button> : <div className={style.navbarProfile}>
          <img src={assets.profile_icon} />
          <ul className={style.navProfileDropdown}>
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} /><p>Orders</p></li>
            <hr />
            <li onClick={Logout}><img src={assets.logout_icon} /><p>Logout</p></li>
          </ul>
        </div>}

      </div>
    </div>
  );
};

export default Navbar;