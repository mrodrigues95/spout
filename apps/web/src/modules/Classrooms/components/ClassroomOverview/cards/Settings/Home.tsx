import { ReactNode, useContext } from 'react';
import { Modal, Button, ButtonOrLinkProps } from '@spout/toolkit';
import { ChevronIcon } from '@spout/assets/icons/outline';
import {
  LeaveIllustration,
  EditIllustration,
} from '@spout/assets/illustrations';
import { SettingsContext, modals } from './Settings';

interface HomeButtonProps extends Pick<ButtonOrLinkProps, 'onClick'> {
  label: string;
  illustration: ReactNode;
}

const HomeButton = ({ label, illustration, onClick }: HomeButtonProps) => {
  return (
    <Button variant="outline" className="!border-gray-400" onClick={onClick}>
      <div className="flex flex-1 items-center space-x-2">
        {illustration}
        <span>{label}</span>
      </div>
      <ChevronIcon className="w-5 h-5 text-black transform rotate-180" />
    </Button>
  );
};

const Home = () => {
  const { setModal } = useContext(SettingsContext)!;

  return (
    <>
      <Modal.Header
        title="Settings"
        description="Manage your classroom settings below"
        dismiss
      />
      <Modal.Body>
        <HomeButton
          label="Edit Classroom"
          illustration={<EditIllustration width={50} height={50} />}
          onClick={() => setModal(modals['edit'])}
        />
        <HomeButton
          label="Leave Classroom"
          illustration={<LeaveIllustration width={50} height={50} />}
          onClick={() => setModal(modals['leave'])}
        />
      </Modal.Body>
    </>
  );
};

export default Home;
