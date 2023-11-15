import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function CommentForm({ boardId, isSubmitting, onSubmit }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit({ boardId, comment });
  }

  return (
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button isDisabled={isSubmitting} onClick={handleSubmit}>
        쓰기
      </Button>
    </Box>
  );
}

function CommentList({ commentList, onDeleteComment }) {
  const handleDelete = async (commentId) => {
    try {
      // 댓글 삭제 API 엔드포인트 호출
      await axios.delete(`/api/comment/delete/${commentId}`);

      // 삭제 후 commentList 갱신 (임시로 서버 요청 성공 여부를 가정)
      const updatedCommentList = commentList.filter(
        (comment) => comment.id !== commentId,
      );
      onDeleteComment(updatedCommentList);
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">댓글 리스트</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {commentList.map((comment) => (
            <Box key={comment.id}>
              <Flex justifyContent="space-between">
                <Heading size="xs">{comment.memberId}</Heading>
                <Text fontSize="xs">{comment.inserted}</Text>
              </Flex>
              <Text sx={{ whiteSpace: "pre-wrap" }} pt="2" fontSize="sm">
                {comment.comment}
              </Text>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(comment.id)}
              >
                삭제
              </Button>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function CommentContainer({ boardId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (!isSubmitting) {
      const params = new URLSearchParams();
      params.set("id", boardId);

      axios
        .get("/api/comment/list?" + params)
        .then((response) => setCommentList(response.data));
    }
  }, [isSubmitting]);

  function handleSubmit(comment) {
    setIsSubmitting(true);

    axios
      .post("/api/comment/add", comment)
      .finally(() => setIsSubmitting(false));
  }

  const handleDeleteComment = (deletedCommentId) => {
    // 삭제된 댓글을 필터링하여 commentList를 업데이트합니다.
    setCommentList((prevCommentList) =>
      prevCommentList.filter((comment) => comment.id !== deletedCommentId),
    );
  };

  return (
    <Box>
      <CommentForm
        boardId={boardId}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
      <CommentList
        boardId={boardId}
        commentList={commentList}
        onDeleteComment={handleDeleteComment}
      />
    </Box>
  );
}
