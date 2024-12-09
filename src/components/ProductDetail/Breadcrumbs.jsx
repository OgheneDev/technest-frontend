import { Link } from 'react-router-dom';
import { ChevronRight, House } from 'lucide-react';

const Breadcrumbs = ({ category, name }) => (
  <div className="path flex gap-[13px] flex-wrap items-center uppercase text-[12px] mb-5 text-gray-500">
    <Link to='/'>
      <House size={15} />
    </Link>
    <ChevronRight size={10} />
    <Link to=''>{category}</Link>
    <ChevronRight size={10} />
    {name}
  </div>
);

export default Breadcrumbs;
