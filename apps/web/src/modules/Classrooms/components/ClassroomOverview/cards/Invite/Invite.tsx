export {}

// import { useCallback, useContext, useEffect, useState } from 'react';
// import { graphql, useFragment, useMutation } from 'react-relay';
// import { useRouter } from 'next/router';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { useForm } from 'react-hook-form';
// import { generateId, Spinner, Form, Modal } from '@spout/toolkit';
// import {
//   CreateClassroomInviteMutation,
//   CreateClassroomInviteMutationVariables,
// } from './__generated__/Invite.generated';
// import { ClassroomActionCard } from '../ClassroomCard';
// import { Props as OverviewProps } from '../../../ClassroomOverview';
// import { ClassroomOverviewContext } from '../../ClassroomOverviewProvider';
// import InviteSettings, {
//   InviteSettings as InviteSettingsType,
// } from './InviteSettings';
// import CopyInvite from './CopyInvite';
// import { Invite_classroom$key } from './__generated__/Invite_classroom.graphql';
// import { InviteMutation } from './__generated__/InviteMutation.graphql';

// const defaultValues: InviteSettingsType = {
//   maxAge: null,
//   maxUses: null,
// };

// const mutation = graphql`
//   mutation InviteMutation($input: CreateClassroomInviteInput!) {
//     createClassroomInvite(input: $input) {
//       invite {
//         id
//         code
//         uses
//         maxUses
//         maxAge
//         expiresAt
//         createdAt
//       }
//     }
//   }
// `;

// const fragment = graphql`
//   fragment Invite_classroom on Classroom {
//     name
//   }
// `;

// interface Props {
//   classroom: Invite_classroom$key;
// }

// const Invite = ({ classroom }: Props) => {
//   const router = useRouter();
//   const classroomId = router.query.classroomId as string
//   const [isOpen, setIsOpen] = useState(false);
//   const data = useFragment(fragment, classroom);
//   const [commit, isInFlight] = useMutation<InviteMutation>(mutation);

//   const { classroomInvite, setClassroomInvite } = useContext(
//     ClassroomOverviewContext
//   )!;

//   const form = useForm<Pick<InviteSettingsType, 'maxAge' | 'maxUses'>>({
//     defaultValues,
//   });

//   const createInvite = useCallback(
//     (classroomId: string, code?: string, maxAge?: number, maxUses?: number) => {
//       commit({
//         variables: {
//           input: {
//             classroomId,
//             code,
//             maxAge,
//             maxUses,
//           },
//         },
//         onCompleted: (data) => {
//           setClassroomInvite(data.createClassroomInvite.invite);
//           form.reset();
//         },
//       });
//     },
//     [commit, setClassroomInvite, form]
//   );

//   useEffect(() => {
//     // Create invite on initial mount.
//     if (!data && !loading && !error) {
//       createInvite({
//         variables: {
//           input: {
//             classroomId: classroom.id,
//             code: classroomInvite?.code,
//           },
//         },
//       });
//     }
//   }, [data, loading, error, createInvite, classroomInvite, classroom]);

//   const onSubmit = useCallback(
//     ({ maxAge, maxUses }: InviteSettingsType) =>
//       createInvite(classroomId, undefined, maxAge?.value, maxUses?.value),
//     [createInvite, classroom]
//   );

//   const labelId = `spout-classroom-invite-label-${generateId()}`;
//   const descId = `spout-classroom-invite-desc-${generateId()}`;

//   return (
//     <>
//       <ClassroomActionCard
//         aria-labelledby={labelId}
//         aria-describedby={descId}
//         title="Invite"
//         icon={<FontAwesomeIcon icon={faEnvelope} className="text-green-600" />}
//         description={`Invite people to ${classroom.name}`}
//         className="col-start-2"
//         onClick={() => setIsOpen(true)}
//       />
//       <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
//         <Modal.Overlay />
//         <Form form={form} onSubmit={onSubmit}>
//           <Modal.Content>
//             <Modal.Header
//               title={`Invite students to ${classroom.name}`}
//               description="Add students to your classroom by sharing the invite link below"
//               dismiss
//             />
//             <Modal.Body>
//               <div>
//                 {loading && <Spinner size="sm" srLabel="Generating invite" />}
//                 {data && (
//                   <CopyInvite invite={data.createClassroomInvite.invite} />
//                 )}
//               </div>
//               <InviteSettings control={form.control} />
//             </Modal.Body>
//             <Modal.Footer>
//               <Form.SubmitButton
//                 size="sm"
//                 disabled={!form.formState.isDirty || loading}
//                 className="font-semibold"
//               >
//                 Generate Invite
//               </Form.SubmitButton>
//             </Modal.Footer>
//           </Modal.Content>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default Invite;
