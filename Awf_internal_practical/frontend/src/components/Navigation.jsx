import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Navigation(){const{employee,logout}=useAuth(),navigate=useNavigate();if(!employee)return null;return <nav><Link to="/apply">Apply Leave</Link><Link to="/my-leaves">My Leaves</Link><Link to="/hr">HR Panel</Link><button type="button" onClick={()=>{logout();navigate("/");}}>Logout</button></nav>;}
