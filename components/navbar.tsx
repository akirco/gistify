import DarkSwitch from '@/components/darkswitch';
import { MobileMenu } from './mobilemenu';
import { Cron } from './corn';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="flex justify-between max-w-6xl p-5 m-auto rounded-bl-lg rounded-br-lg shadow-lg bg-background-secondry text-foreground-primary backdrop-blur-md">
        <MobileMenu />
        <Cron />
        <DarkSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
