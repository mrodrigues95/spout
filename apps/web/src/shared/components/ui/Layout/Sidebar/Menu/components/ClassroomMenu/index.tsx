import { useContext } from 'react';
import { Classroom } from '../../../../../../../../__generated__/schema.generated';
import { MenuContext } from '../../MenuProvider';
import Menu from '../..';
import EmptyFallback from '../../../../../EmptyFallback';

interface Props {
  classrooms: Partial<Classroom>[];
}

const ClassroomMenu = ({ classrooms }: Props) => {
  const {
    currentMenu,
    setCurrentMenu,
    setCurrentModal,
    setSelectedClassroom,
  } = useContext(MenuContext)!;

  if (currentMenu !== 'classroom') return null;

  // TODO: Use shallow routing for navigating between classrooms.
  return (
    <>
      <Menu.Header>Classrooms</Menu.Header>
      <div className="max-h-52 -mb-1 p-1 overflow-auto">
        {classrooms.length ? (
          classrooms.map((classroom: any) => (
            <Menu.Item
              key={classroom.id}
              type="button"
              variant="default"
              onClick={() => {
                setCurrentMenu('discussion');
                setSelectedClassroom(classroom);
              }}
            >
              {classroom.name}
            </Menu.Item>
          ))
        ) : (
          <div className="my-4">
            <EmptyFallback
              heading="There's nothing here, yet."
              body="Use the button below to create your first classroom."
            />
          </div>
        )}
      </div>
      <Menu.Seperator />
      <Menu.Item
        type="button"
        variant="info"
        onClick={() => setCurrentModal('create-classroom')}
      >
        Create Classroom
      </Menu.Item>
      <Menu.Item
        type="button"
        variant="info"
        onClick={() => setCurrentModal('join')}
      >
        Join Classroom
      </Menu.Item>
    </>
  );
};

export default ClassroomMenu;
