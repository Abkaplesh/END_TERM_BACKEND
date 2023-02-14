import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./review.css";
import { getreview } from "../../actions/orderaction";
import StarRatings from 'react-star-ratings';
export default function Review(props) {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.review);


    const { review } = reviews;

    useEffect(() => {
        dispatch(getreview(props.id));
    }, [dispatch]);

    return review != null ? (
        <div className="review">
            <OwlCarousel
                style={{ zIndex: "auto" }}
                className="owl-themes"
                dots={true}
                navText={[
                    "<div style='font-size:4em; display:none' className='nav-btn prev-slides'><</div>",
                    "<div style='font-size:4em; display:none' className='nav-btn next-slides'>></div>",
                ]}
                lazyLoad={true}
                autoplay={true}
                items={1}
                loop
                margin={0}
                nav={false}
            >
                {review.map((item, index) => {

                    return (
                        <div className="reviews">
                            <div className="reviews-para">
                                <p>{item.review}</p>
                            </div>
                            <div className="review-name">
                                <img
                                    src="https://static.remove.bg/remove-bg-web/97e23b9bea3ef10227bf2e0bed160d3a30f93253/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg"
                                    alt=""
                                />
                                <p>{item.name}</p>
                                <StarRatings
                                    rating={item.rating}
                                    starRatedColor="yellow"
                                    starDimension="15px"
                                    starSpacing="0px"
                                />
                            </div>
                        </div>
                    );
                })}
            </OwlCarousel>
        </div>
    ) : (
        <div></div>
    );
}
