import React,{useState,useEffect} from 'react'
import './catItem.css'
import { useSelector, useDispatch } from 'react-redux'
import {changeQuantity} from '../../stores/cart'

function CartItem(props) {
    const {spectacleId} =props.data;
 
const dispatch = useDispatch();

    const [detail,setDetail] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/spectacle/${spectacleId}`);
                const data = await response.json();
                setDetail(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchData();

    },[spectacleId])
    const handleMinusQuantity = () =>{
        dispatch(changeQuantity({
            spectacleId:spectacleId,
            quantity:props.data.quantity-1
        })

        );

    }
    const handlePlusQuantity=()=>{
        dispatch(changeQuantity({
            spectacleId:spectacleId,
            quantity:props.data.quantity+1
        })

        )
    }
    

  return (
    <div className='cartItem-container'>
        <img src={detail.imageurlcolor1} width={30} height={30}/>
        <h6>{detail.brand}</h6>
        <h6>{detail.model}</h6>
        
        <h6>{props.data.quantity}</h6>
   
        <button className='btn-delete'  onClick={handleMinusQuantity}>-</button>
        <button className='btn-delete'  onClick={handlePlusQuantity}>+</button>

    
    </div>
  )
}

export default CartItem
