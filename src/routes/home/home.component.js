import Directory from '../../component/directory/directory.component';
import {Outlet} from 'react-router'



function Home() {

  const categories = [
    {
      id: 1,
      title: 'Hats',
      imageUrl:'https://i.ibb.co/cvpntL1/hats.png'
    },
    {
      id: 2,
      title: 'Jackets',
      imageUrl:'https://i.ibb.co/px2tCc3/jackets.png'
    },
    {
      id: 3,
      title: 'Shoes',
      imageUrl:'https://i.ibb.co/0jqHpnp/sneakers.png'
    },
    {
      id: 4,
      title: 'Mens',
      imageUrl:'https://i.ibb.co/R70vBrQ/mens.png'
    },
    {
      id: 5,
      title: 'Womens',
      imageUrl:'https://i.ibb.co/GCCdy8t/womens.png'
    }
  ];

  return (
    <div >
      <Outlet/>
      <Directory categories={categories}/>
    </div>
  );
}

export default Home;
