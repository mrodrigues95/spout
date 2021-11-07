import { Link, Button } from '@spout/toolkit';
import Search from '../Search';
import Avatar from '../Avatar';
import { getRandomAvatar } from '../../../utils/getRandomAvatar';

const SidebarItem = () => {
  return (
    <li>
      <Link href="#" variant="ghost" fullWidth className="text-sm space-x-4">
        <Avatar src={getRandomAvatar()} aria-hidden="true" />
        <span className="flex-1">Introduction to C#</span>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="flex flex-col px-4 space-y-8 max-w-xs">
      <div className="flex items-center justify-center space-x-6">
        <Avatar src={getRandomAvatar()} aria-hidden="true" />
        <Search placeholder="Search" />
      </div>
      <nav className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-500 text-sm font-semibold tracking-wide uppercase">
            Classrooms
          </span>
          <Button
            size="xs"
            variant="light"
            scheme="orange"
            className="uppercase rounded"
          >
            Create
          </Button>
        </div>
        <ul className="space-y-2">
          <SidebarItem />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
