export {};
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLaughBeam } from '@fortawesome/free-solid-svg-icons';
// import { ClassroomContentCard } from '../ClassroomCard';
// import { graphql, useFragment } from 'react-relay';
// import { Instructor_classroomName$key } from './__generated__/Instructor_classroomName.graphql';

// const fragment = graphql`
//   fragment Instructor_classroomName on Classroom {
//     ...Invite_classroom
//   }
// `;

// interface Props {
//   classroom: Instructor_classroomName$key;
// }

// const Instructor = ({ classroom }: Props) => {
//   const data = useFragment(fragment, classroom);

//   return (
//     <ClassroomContentCard
//       title="Instructor"
//       icon={<FontAwesomeIcon icon={faLaughBeam} className="text-yellow-500" />}
//       description={`John Doe is your instructor for ${classroom.name}`}
//       className="w-full"
//     />
//   );
// };

// export default Instructor;
