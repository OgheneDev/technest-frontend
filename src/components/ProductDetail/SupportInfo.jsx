import { Truck, CircleDollarSign, CalendarClock, LockOpen } from 'lucide-react';

const SupportInfo = () => (
  <div className="facts flex flex-col gap-3  pb-5">
    {[
      { icon: Truck, text: 'Free Shipping & Returns' },
      { icon: CircleDollarSign, text: 'Money Back Guarantee' },
      { icon: CalendarClock, text: 'Online Support 24/7' },
      { icon: LockOpen, text: 'Secure Payment' },
    ].map(({ icon: Icon, text }, index) => (
      <div key={index} className="flex gap-3 items-center">
        <Icon size={45} className="text-bs-indigo" />
        <span className="text-xl font-semibold">{text}</span>
      </div>
    ))}
  </div>
);

export default SupportInfo;
