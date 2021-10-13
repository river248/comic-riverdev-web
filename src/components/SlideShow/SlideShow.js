import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'

import './SlideShow.scss'

function SlideShow() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://4.bp.blogspot.com/-H3Nd4Wu-qUs/WV7gdA9dAHI/AAAAAAAASJc/2O6e-uSXX1YGbrdoaWVH-0AcuL2fZ_-iwCLcBGAs/s1600/hinh-anh-naruto-dep-nhat-tai-anh-naruto-full-hd%2B%25282%2529.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://4.bp.blogspot.com/-H3Nd4Wu-qUs/WV7gdA9dAHI/AAAAAAAASJc/2O6e-uSXX1YGbrdoaWVH-0AcuL2fZ_-iwCLcBGAs/s1600/hinh-anh-naruto-dep-nhat-tai-anh-naruto-full-hd%2B%25282%2529.jpg"
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://4.bp.blogspot.com/-H3Nd4Wu-qUs/WV7gdA9dAHI/AAAAAAAASJc/2O6e-uSXX1YGbrdoaWVH-0AcuL2fZ_-iwCLcBGAs/s1600/hinh-anh-naruto-dep-nhat-tai-anh-naruto-full-hd%2B%25282%2529.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default SlideShow
