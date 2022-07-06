import { Avatar } from '@mui/material';
import React, { useRef } from 'react';
import "../../css/Home/StudentReviews.css";
import useOnScreen from '../../usable/useOnScreen';

const StudentReviews = () => {

    const titleOnScreenRef = useRef();
    const titleVisible = useOnScreen(titleOnScreenRef);

    const cardOnScreenRef = useRef();
    const cardVisible = useOnScreen(cardOnScreenRef);

    const StudentReviewCard = ({title, msg, photo, tag}) => {
        return(
            <div className="studentReviewCard">
                <p>{msg}</p>
                <div className="studentReview__author">
                    <Avatar src={photo} alt="Asad Memon" />
                    <div className="studentReview__name">
                    <h3>{title}</h3>
                    <p>{tag}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="studentReviews text-poppins">
            <h1 className={`${titleVisible ? "studentReviews__titleVisible" : "studentReviews__titleNot"}`} ref={titleOnScreenRef}>We have <span>15,432 Students</span> who enrolled for our <br/> Bano Fullstack courses.</h1>

            <div ref={cardOnScreenRef} className="studentReviewsCards">
                <div className={`studentReviewsCard__row ${cardVisible ? "studentReviewsCard__row--visible" : ""}`}>
                
                <StudentReviewCard title="Asad Memon" tag="I.T. Engineering Student" msg="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, ducimus." photo="https://images.unsplash.com/photo-1618641662184-bafefb91a542?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"  />
                <StudentReviewCard title="Sakshi Rathod" tag="Sales And Marketing at Infosis" msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quis dolorum ratione molestiae in commodi." photo="https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature-1600x900.jpg" />
                <StudentReviewCard title="Dhiraj Shastri" tag="LeadsArk Mentor" msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis inventore nulla Facilis inventore nulla." photo="https://pbs.twimg.com/profile_images/1391038245543186433/nuFv71pZ_400x400.jpg" />
                </div>
                
                <div className={`studentReviewsCard__row ${cardVisible ? "studentReviewsCard__row--visible" : ""}`}>
                <StudentReviewCard title="Hamid Khan" tag="UPSC Civil Services" msg="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, ducimus." photo="https://www.jagranjosh.com/imported/images/E/Articles/UPSC-interview-schedule-2019-july20-july30.jpg"  />
                <StudentReviewCard title="Faraz Mirza" tag="Game Developer at GameLon" msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quis dolorum ratione molestiae in commodi." photo="https://blog.eduonix.com/wp-content/uploads/2021/05/Game-developer-gaming-game-designing-game-development-scaled-e1620913877686.jpg" />
                <StudentReviewCard title="Obaid Khan" tag="Cryptocurrency Trader" msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis inventore nulla Facilis inventore nulla." photo="https://images.livemint.com/img/2021/08/09/1600x900/2021-08-06T140338Z_1297605380_RC2LZO9L4ZD3_RTRMADP_3_FINTECH-CRYPTO_1628476284640_1628476303835.JPG" />
                </div>
                <div className={`studentReviewsCard__row ${cardVisible ? "studentReviewsCard__row--visible" : ""}`}>
                <StudentReviewCard title="Shoaib Khan" tag="Fitness Trainer" msg="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, ducimus." photo="https://images-eu.ssl-images-amazon.com/images/I/81DCubP%2BJEL.png"  />
                <StudentReviewCard title="Mr Y" tag="Maths Academy" msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quis dolorum ratione molestiae in commodi." photo="https://img.pixers.pics/pho_wat(s3:700/FO/33/04/37/20/700_FO33043720_c6abb22bac4860d3ef3a0b7031c7d795.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/blackout-window-curtains-fire-font-letter-y.jpg.jpg" />
                <StudentReviewCard title="Mr Z" tag="Last Alphabet Owner" msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis inventore nulla Facilis inventore nulla." photo="https://img.pixers.pics/pho_wat(s3:700/FO/57/40/61/80/700_FO57406180_8203b2e61c6fc362f16f13b8d1e6e380.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/sheer-window-curtains-fire-alphabet-letter-z.jpg.jpg" />
                </div>
            </div>
        </div>
    );
}

export default StudentReviews;
