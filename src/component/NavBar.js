import { Button, Flex, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "./LogInProvider";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const toast = useToast();

  const navigate = useNavigate();

  // 화면 이동 필요한게 아니니 handleLogout
  function handleLogout() {
    // TODO : 로그아웃 후 할 일 추가
    axios
      .post("/api/member/logout")
      .then(() => {
        toast({
          description: "로그아웃 되었습니다.",
          status: "info",
        });
        navigate("/");
      })
      .finally(() => fetchLogin());
  }

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>home</Button>
      {isAuthenticated() && (
        <Button onClick={() => navigate("/write")}>write</Button>
      )}
      {isAuthenticated() || (
        <Button onClick={() => navigate("/signup")}>signup</Button>
      )}
      {isAdmin() && (
        <Button onClick={() => navigate("/member/list")}>회원목록</Button>
      )}
      {isAuthenticated() || (
        <Button onClick={() => navigate("/login")}>로그인</Button>
      )}
      {isAuthenticated() && <Button onClick={handleLogout}>로그아웃</Button>}
    </Flex>
  );
}
