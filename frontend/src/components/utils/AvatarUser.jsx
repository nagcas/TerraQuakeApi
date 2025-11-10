import Avatar from '@/assets/images/avatar_default.png';
import { useContext } from 'react';
import { Context } from '../modules/Context';

export default function AvatarUser({ use, size = '150px', image = null }) {
  const { userLogin } = useContext(Context);

  return use === 'navbar' ? (
    <img
      src={userLogin?.avatar || Avatar}
      alt='avatar'
      className='w-7 h-7 rounded-full cursor-pointer border-1 border-purple-500/30'
    />
  ) : (
    <img
      src={userLogin?.avatar || image !== null ? image : Avatar}
      alt='avatar'
      style={{ width: size, height: size }}
      className='rounded-full border-2 border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.6)] object-cover'
    />
  );
}
