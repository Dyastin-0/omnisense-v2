import React, { useEffect } from 'react';
import Button from './ui/Button';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const TimePicker = ({
  selectedTime,
  onChange = () => { }
}) => {
  const handleIncrement = (field) => {
    let newValue;
    let newTime = { ...selectedTime };

    switch (field) {
      case 'hours':
        newValue = selectedTime.hours + 1;
        newTime.hours = newValue > 12 ? 1 : newValue;
        break;
      case 'minutes':
        newValue = selectedTime.minutes + 1;
        newTime.minutes = newValue > 59 ? 0 : newValue;
        break;
      case 'period':
        newTime.period = selectedTime.period === 'AM' ? 'PM' : 'AM';
        break;
      default:
        return;
    }

    onChange(newTime);
  };

  const handleDecrement = (field) => {
    let newValue;
    let newTime = { ...selectedTime };

    switch (field) {
      case 'hours':
        newValue = selectedTime.hours - 1;
        newTime.hours = newValue < 1 ? 12 : newValue;
        break;
      case 'minutes':
        newValue = selectedTime.minutes - 1;
        newTime.minutes = newValue < 0 ? 59 : newValue;
        break;
      case 'period':
        newTime.period = selectedTime.period === 'AM' ? 'PM' : 'AM';
        break;
      default:
        return;
    }

    onChange(newTime);
  };

  useEffect(() => {
    onChange(selectedTime);
  }, []);

  return (
    <div className="flex w-fit items-center">
      <div className="flex flex-col gap-1 items-center">
        <Button
          icon={faChevronUp}
          variant="ghost"
          className="flex items-center justify-center"
          onClick={() => handleIncrement('hours')}
        />
        <div className="text-center font-bold">
          {selectedTime.hours}
        </div>
        <Button
          variant='ghost'
          icon={faChevronDown}
          onClick={() => handleDecrement('hours')}
        />
      </div>


      <div className="flex flex-col gap-1 items-center">
        <Button
          icon={faChevronUp}
          variant='ghost'
          onClick={() => handleIncrement('minutes')}
        />
        <div className="text-center font-bold">
          {selectedTime.minutes.toString().padStart(2, '0')}
        </div>
        <Button
          icon={faChevronDown}
          variant='ghost'
          onClick={() => handleDecrement('minutes')}
        />
      </div>

      <div className="flex flex-col gap-1 items-center">
        <Button
          variant='ghost'
          icon={faChevronUp}
          onClick={() => handleIncrement('period')}
        />
        <div className="text-center font-bold">
          {selectedTime.period}
        </div>
        <Button
          variant='ghost'
          icon={faChevronDown}
          onClick={() => handleDecrement('period')}
        />
      </div>
    </div>
  );
};

export default TimePicker;
