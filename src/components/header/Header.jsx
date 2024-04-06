import React from 'react'
import { Container, LogoutBtn, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

  const authStatus = useSelector((state) => state.auth.status );
  const navigate = useNavigate();     //Returns an imperative method for changing the location.
  // Used by s, but may also be used by other elements to change the location.

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to="/" >
              <Logo width='70px' />
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {        
              navItems
                .map((item) =>
                  item.active ?
                    (
                      <li key={item.name}>
                        <button
                          onClick={() =>  navigate(item.slug) }  // navigate m hmko bs link pass krna h so we passed all slug links
                          className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                          {item.name}
                        </button>
                      </li>
                    ) : null
                )
            }
            {/* ** First Condition && ( ) } -- if first condition gets true then second condition will execute*/}
            {
              authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )
            }
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;