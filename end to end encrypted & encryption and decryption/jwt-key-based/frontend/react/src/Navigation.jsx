import {
  useLocation,
  Link,
} from "react-router-dom";

const Navigation = () =>  {
  return (
    <>
        <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#fff" }}>
            <Link style={{ textDecoration: 'none', color: '#fff', border: '1px solid #0009', borderRadius: '2rem', padding: '0.5rem', backgroundColor: `${useLocation().pathname === '/encrypt' ? '#787828b5' : '' }` }} to="/encrypt">Encrypt</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link style={{ textDecoration: 'none', color: '#fff', border: '1px solid #0009', borderRadius: '2rem', padding: '0.5rem', backgroundColor: `${useLocation().pathname === '/decrypt' ? '#787828b5' : '' }` }} to="decrypt">Decrypt</Link>
        </nav>
    </>
  )
}

export default Navigation