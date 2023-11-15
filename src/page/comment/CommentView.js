// import {
//   Box,
//   Button,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Spinner,
//   useDisclosure,
//   useToast,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";
//
// export function CommentView() {
//   const [comment, setComment] = useState(null);
//   const [params] = useSearchParams();
//
//   const { isOpen, onClose, onOpen } = useDisclosure();
//
//   const navigate = useNavigate();
//   const toast = useToast();
//
//   useEffect(() => {
//     axios
//       .get("/api/comment?" + params.toString())
//       .then((response) => setMember(response.data));
//   }, []);
//
//   if (member === null) {
//     return <Spinner />;
//   }
//   function handleDelete() {
//     axios
//       .delete("/api/comment?" + params.toString())
//       .then(() => {
//         toast({
//           description: "댓글이 삭제되었습니다.",
//           status: "success",
//         });
//         navigate("/");
//       })
//       .catch((error) => {
//         if (error.response.status === 401 || error.response.status === 403) {
//           toast({
//             description: "댓글 삭제 권한이 없습니다.",
//             status: "error",
//           });
//         } else {
//           toast({
//             description: "댓글 삭제 처리 중에 문제가 발생하였습니다.",
//             status: "error",
//           });
//         }
//       })
//       .finally(() => onClose());
//   }
//
//   return (
//     <Box>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>삭제 확인</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>삭제 하시겠습니까?</ModalBody>
//
//           <ModalFooter>
//             <Button onClick={onClose}>닫기</Button>
//             <Button onClick={handleDelete} colorScheme="red">
//               삭제
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// }
