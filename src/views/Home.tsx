import styles from '../styles/modules/Home.module.scss';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getComments } from '../api/comment';

// Logos
import Logo from '../assets/Logo.png';
import { IoFastFoodSharp } from 'react-icons/io5';
import { FaMoneyBillWave } from 'react-icons/fa';
import { BsFillCalculatorFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

import ReactStars from 'react-stars';

export type Comment = {
  commentor: string;
  comment: string;
  star: number;
  date: string;
}

function Home() {
  const [comments, setComments] = useState<Array<Comment>>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await getComments();
      setComments(res);
    };
    fetchComments().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header/>
      <main className={styles.main}>
        <section className={styles.welcomeSection}>
          <h1 className={styles.welcomeMessage}>Welcome to Otsimo the most transparent food brand</h1>
          <div className={styles.welcomeWrapper}>
            <div className={styles.information}>
              <img src={Logo} className={styles.brandLogo} alt="brand_logo"/>
              <span>
                In this restaurant, honesty is extremely promoted. So extreme, that the restaurant declares that
                differing quality of ingredients are used in their meals. Like that`s not enough, it also allows the
                customers to choose the ingredients of each meal in different qualities. Each ingredient has the
                following quality levels:
                <ul>
                  <li>
                    <AiFillStar className={styles.listItemIcon}/>
                    <span>
                      Low: The Cheapest
                    </span>
                  </li>
                  <li>
                    <AiFillStar className={styles.listItemIcon}/>
                    <span>
                      Medium: Moderate
                    </span>
                  </li>
                  <li>
                    <AiFillStar className={styles.listItemIcon}/>
                    <span>
                      High: Best Quality
                    </span>
                  </li>
                </ul>
              </span>

            </div>
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <IoFastFoodSharp className={styles.cardLogo}/>
                <span className={styles.cardText}>You can select the quality of your ingredients.</span>
              </div>
              <div className={styles.card}>
                <FaMoneyBillWave className={styles.cardLogo}/>
                <span className={styles.cardText}>Create the best quality food or the cheapest.</span>
              </div>
              <div className={styles.card}>
                <BsFillCalculatorFill className={styles.cardLogo}/>
                <span className={styles.cardText}>Interactive meal builder and price calculation.</span>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.commentSection}>
          <h1 className={styles.commentsText}>Comments</h1>
          <Swiper
            className={styles.commentContainer}
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false
            }}
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
              1536: { slidesPerView: 5 }
            }}
          >
            {
              comments.map((comment, id) => {
                return (
                  <SwiperSlide className={styles.commentCard} key={id}>
                    <div className={styles.commentorWrapper}>
                      <h3 className={styles.commentor}>{comment.commentor}</h3><br/>
                      <h3 className={styles.date}>{comment.date}</h3><br/>
                    </div>
                    <h3 className={styles.comment}>{comment.comment}</h3><br/>
                    <div className={styles.starWrapper}>
                      <ReactStars counts={5} value={comment.star} edit={false} size={24} />
                    </div>
                  </SwiperSlide>
                );
              })
            }
          </Swiper>
        </div>
      </main>
    </>
  );
}

export default Home;