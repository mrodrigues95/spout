import { useContext } from 'react';
import { Classroom } from '~/__generated__/schema.generated';
import { Menu as MenuEnum, MenuContext } from '../../MenuProvider';
import Menu from '../..';
import EmptyFallback from '../../../../../EmptyFallback';

interface Props {
  classrooms: Partial<Classroom>[];
}

const ClassroomMenu = ({ classrooms }: Props) => {
  const { currentMenu, setCurrentMenu, setSelectedClassroom } = useContext(
    MenuContext
  )!;

  if (currentMenu !== MenuEnum.Classrooms) return null;

  return (
    <>
      <Menu.Header>Classrooms</Menu.Header>
      <div className="max-h-52 -mb-1 p-1 overflow-auto">
        {classrooms && classrooms.length ? (
          classrooms.map((classroom: any) => (
            <Menu.Item
              key={classroom.id}
              type="button"
              variant="default"
              onClick={() => {
                setCurrentMenu(MenuEnum.Discussions);
                setSelectedClassroom(classroom);
              }}
            >
              {classroom.name}
            </Menu.Item>
          ))
        ) : (
          <div className="my-4">
            <EmptyFallback
              message="There's nothing here, yet."
              submessage="Use the button below to create your first classroom."
            />
          </div>
        )}
      </div>
      <Menu.Seperator />
      <Menu.Item
        type="button"
        variant="info"
        onClick={() => console.log('Create a classroom clicked!')}
      >
        Create Classroom
      </Menu.Item>
    </>
  );
};

export default ClassroomMenu;
