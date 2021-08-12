import {React, useState , useEffect} from 'react'
import { connect } from 'react-redux'
import { togglePage } from '../redux/actions'

export const PageButtons = ({ togglePage, elementsLength, pages }) => {
    const [limits, setLimits] = useState()
    const [max , setMax] = useState(1)
    const [Page, setPage] = useState([])

    useEffect(() => {
        setPage([])
        setMax(Math.ceil(elementsLength / 9))
        if (max === 0 )setLimits(0)
        else setLimits(1)
    }, [elementsLength])
    
    useEffect(() => {
  
        if (limits <= max ) {
            setPage([...Page, limits])
            setLimits(limits + 1)
        }

    }, [limits])
    

    return (
        <div className='btn-group'>
            {/* <button onClick={() => togglePage(Page[0])}>{Page[0]} </button>
            
            {Page[0] !== Page[Page.length - 1] && <button onClick = {() => togglePage(Page[Page.length - 1])}>{Page[Page.length - 1]} </button>} */}
            {Page.length > 0 ? Page.map(el => el !== 0 && <button onClick = {() => togglePage(el)} >{el} </button> ) : <p>No hay juegos</p>}
         </div>
    )
}

const mapStateToProps = (state) => ({
    sortedPage: state.sortedPageIndex,
    sorted: state.sorted,
    elementsLength: state.elementsLength,
    pages: state.pageIndex,
})

const mapDispatchToProps = {
    togglePage: page => togglePage(page)
}

export default connect(mapStateToProps, mapDispatchToProps)(PageButtons)

{/* <button onClick={() =>{ 
   togglePage(1)
   setPage([2,3,4])
}
} > 1</button>
{ Page[0] !== 2 && <button onClick = {() => setPage(Page.map(p => p - 1))}>...</button>}
{Page && Page.map(p => <button key={p}  onClick={() => {
   handleClick(p)
   togglePage(p)
}}>{p} </button>)}
{Page[2] !== 11 && <button onClick = {() => setPage(Page.map(p => p + 1))}>...</button>}
<button onClick={() => { 
   togglePage(12)
   setPage([9,10,11])
}} > 12 </button> */}