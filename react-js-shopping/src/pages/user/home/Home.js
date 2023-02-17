import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import axios from 'axios';
import MaterialSlideCarousel from './components/material-slide-carousel/MaterialSlideCarousel'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { categories } from '../../../constants/data/Categories'
import { useSelector } from 'react-redux';



const Home = () => {

  const navigate = useNavigate();
  const login = useSelector(state => state.login)
  const [categories, setCategories] = React.useState([])

  React.useEffect(() => {
    getCateories()
  }, [])

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const getCateories = async () => {
    const { data: res } = await axios.get(
      `${process.env.REACT_APP_API_URL}/category`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${login.token}`
        }
      }
    );
    // console.log('res', res)
    setCategories(res.data)
  }
  return (
    <>
      <MaterialSlideCarousel />

      {categories && <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={true}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        showDots={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {
          categories?.map((e, i) => {
            return (
              <div
                key={i}
                style={{ margin: "1rem", border: "1px solid black", padding: "1rem", borderRadius: "8px", cursor: 'pointer',textAlign: 'center' }}
                onClick={() => {
                  // alert(e.id);
                  navigate('/view-product-list', {
                    state: {
                      categoryName: e.categoryName
                    }
                  });
                }
                }
              >
                <img src={`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/${e.categoryImage}`} alt="product" style={{ width: '150px', height: '150px' }} />
                <p  style={{fontWeight : 'bold'}}>{e.categoryName}</p>
              </div>
            )
          })
        }
      </Carousel>}
    </>


  )
}

export default Home

