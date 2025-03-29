
import Lottie from 'lottie-react';
import Money from '../animations/Animation - 1743275845135.json'

export function MyAnimation() {
  return (
    <div className="w-full flex justify-center items-center">
      <Lottie animationData={Money} loop={true} />
    </div>
  );
}

