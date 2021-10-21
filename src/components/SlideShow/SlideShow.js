import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import poster1 from 'resources/poster1.png'
import poster2 from 'resources/poster2.png'
import poster3 from 'resources/poster3.png'
import './SlideShow.scss'

function SlideShow() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img className="d-block w-100" src={poster1} alt="First slide"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={poster2} alt="Second slide"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={poster3} alt="Third slide" />
            </Carousel.Item>
        </Carousel>
    )
}

export default SlideShow
