import Avatar from '@/assets/images/avatar_default.png';
import { useContext } from 'react';
import { Context } from '../modules/Context';

export default function AvatarUser({ use }) {
  const { userLogin } = useContext(Context);

  return use === 'navbar' ? (
    <img
      src={userLogin?.avatar || Avatar}
      alt='avatar'
      className='w-7 h-7 rounded-full cursor-pointer border border-purple-500/30'
    />
  ) : (
    <img
      src={userLogin?.avatar || Avatar}
      alt='avatar'
      className='w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.6)] object-cover'
    />
  );
}
