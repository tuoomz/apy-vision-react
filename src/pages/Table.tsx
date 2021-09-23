import axios from 'axios';
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";


const Table = () => {


    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pools, setPools] = useState([]);
    const [user, setUser] = useState({ email: '', id:0, portfolio: {lp_pool_name:'', lp_pool_tokens:0}, });
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);

    const logout = async () => {
        await axios.post('logout', {})
    }
    

    const  handleBuy = async (e :any) => {
        e.preventDefault();
        const lp_pool_name = e.currentTarget.getAttribute("data-pool-name")
        const lp_pool_price = e.currentTarget.getAttribute("data-lp-pool-price")
        const lp_pool_tokens = 100000 / lp_pool_price;

        setUser(previousState => ({
            ...previousState,
            portfolio: {lp_pool_tokens, lp_pool_name}
        }));
        
        const id = user.id;
        const {data} = await axios.post('users/portfolio', {
            id,
            lp_pool_name,
            lp_pool_tokens,
        })
    }

    useEffect(() => {
        (
            async () => {
                try {
                    const poolResponse = await axios.get('data/pools')
                    setPools(poolResponse.data);

                    const userResponse = await axios.get('user');
                    setUser(userResponse.data);
                    
                    const leaderboardResponse = await axios.get('portfolio/leaderboard',  { withCredentials: true });
                    setLeaderboard(leaderboardResponse.data);              

                    // If a user has a portfolio calculate its value
                    if(userResponse.data.portfolio){
                        const price = poolResponse.data.find((x:any) => x.name === userResponse.data.portfolio.lp_pool_name)?.avg_lp_price;
                        setPortfolioValue((price || 0) * userResponse.data.portfolio.lp_pool_tokens)
                    }
                    else{
                        setPortfolioValue(100000)
                    }

                    setLoading(false);
             

                } catch (error) {
                    setRedirect(true);
                }

            }
        )();
    }, []);

    if(redirect){
        return <Redirect to={'/login'}/>
    }

    if(loading){
        return <div> Loading ...</div>
    }

    return (<>
                <div>User : {user.email}</div>
                <div>Portfolio Value : {portfolioValue}</div>
                <div>Pool : {user.portfolio?.lp_pool_name}</div>
                <div>Tokens Held : {user.portfolio?.lp_pool_tokens}</div>
                
                <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <Link to="/login" className="p-2 text-white text-decoration-none" onClick={logout}> Sign out</Link>
                </nav>
                <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {pools.map(( pool: any) => {
                    return(
                    <tr key={pool.name}>
                        <td>{pool.name}</td>
                        <td>{pool.avg_lp_price}</td>
                        <td>{user.portfolio ===null && <button onClick={handleBuy} data-pool-name={pool.name} data-lp-pool-price={pool.avg_lp_price}>Buy</button>}</td>
                    </tr>
                    )
                    })}
                </tbody>
                </table>
                <br/>
                <h2>Leaderboard</h2>
                <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map(( user: any) => {
                    return(
                    <tr key={user.email}>
                        <td>{user.email}</td>
                        <td>{user.value}</td>
                    </tr>
                    )
                    })}
                </tbody>
                </table>
                </>
    )
}

export default Table;