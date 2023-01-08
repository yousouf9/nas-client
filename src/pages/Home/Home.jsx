import * as React from 'react';
import ListBookItem from '../../components/Book/ListBook';
import ListPremiumBookItem from '../../components/Book/ListPremiumBooks';
import HomeFooter from '../../components/footer/Footer';
import HomeHeader from '../../components/headers/Home';
import { BookSection } from '../../components/home/BookSection';
import HomeIntroduction from '../../components/home/Introduction';

const Home = () => {

  return (
    <>
        <HomeHeader />
        <HomeIntroduction />
        <BookSection  title="Free Read books">
        <ListBookItem />  
        </BookSection>
        <BookSection  title="Premium books">
          <ListPremiumBookItem />
        </BookSection>
        <HomeFooter />      
    </>
  )
}

export default Home