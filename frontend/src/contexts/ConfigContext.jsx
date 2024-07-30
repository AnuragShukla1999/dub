/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import * as actionType from '../store/actions';
import { CONFIG } from '../config/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const initialState = {
  ...CONFIG,
  isOpen: [],
  isTrigger: []
};
const ConfigContext = createContext(initialState);
const { Provider } = ConfigContext;

const ConfigProvider = ({ children }) => {
  let trigger = [];
  let open = [];

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actionType.CHANGE_LAYOUT:
        return {
          ...state,
          layout: action.layout
        };
      case actionType.COLLAPSE_MENU:
        return {
          ...state,
          collapseMenu: !state.collapseMenu
        };
      case actionType.COLLAPSE_TOGGLE:
        if (action.menu.type === 'sub') {
          open = state.isOpen;
          trigger = state.isTrigger;

          const triggerIndex = trigger.indexOf(action.menu.id);
          if (triggerIndex > -1) {
            open = open.filter((item) => item !== action.menu.id);
            trigger = trigger.filter((item) => item !== action.menu.id);
          }

          if (triggerIndex === -1) {
            open = [...open, action.menu.id];
            trigger = [...trigger, action.menu.id];
          }
        } else {
          open = state.isOpen;
          const triggerIndex = state.isTrigger.indexOf(action.menu.id);
          trigger = triggerIndex === -1 ? [action.menu.id] : [];
          open = triggerIndex === -1 ? [action.menu.id] : [];
        }
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger
        };
      case actionType.NAV_COLLAPSE_LEAVE:
        if (action.menu.type === 'sub') {
          open = state.isOpen;
          trigger = state.isTrigger;

          const triggerIndex = trigger.indexOf(action.menu.id);
          if (triggerIndex > -1) {
            open = open.filter((item) => item !== action.menu.id);
            trigger = trigger.filter((item) => item !== action.menu.id);
          }
          return {
            ...state,
            isOpen: open,
            isTrigger: trigger
          };
        }
        return { ...state };
      case actionType.NAV_CONTENT_LEAVE:
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger
        };
      case actionType.RESET:
        return {
          ...state,
          layout: initialState.layout,
          collapseMenu: initialState.collapseMenu
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

ConfigProvider.propTypes = {
  children: PropTypes.object
};











// this is for Auth and Product Storage context api
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState([]);

  // const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signin = async (userData) => {
    try {
      const res = await fetch('http://localhost:7000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const resData = await res.json();
      console.log(resData);
      if (res.status === 200) {
        const { validUser } = resData;
        setUser(resData);
        localStorage.setItem('user', JSON.stringify(validUser));
        toast.success('Signed in successfully!');
      } else {
        toast.error('Please Check Your email or password');
      }
      return res;
    } catch (error) {
      console.error('Signin error:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signin, logout, product, setProduct }}>{children}</AuthContext.Provider>
  );
};

export { ConfigContext, ConfigProvider, AuthContextProvider };
