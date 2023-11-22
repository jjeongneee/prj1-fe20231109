import { Box, Button, Flex, Spacer, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { LoginContext } from "./LogInProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons/faHouseChimney";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons/faPenFancy";
import {
  faPerson,
  faRightFromBracket,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const toast = useToast();

  const navigate = useNavigate();

  const urlParams = new URLSearchParams();

  const location = useLocation();

  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== "") {
    urlParams.set("id", login.id);
  }

  function handleLogout() {
    axios.post("/api/member/logout").then(() => {
      toast({
        description: "로그아웃 되었습니다.",
        status: "info",
      });
      navigate("/");
    });
  }

  return (
    <Flex mb={10}>
      <Button
        borderRadius={0}
        variant="ghost"
        size="lg"
        leftIcon={
          <FontAwesomeIcon icon={faHouseChimney} style={{ color: "#d6712e" }} />
        }
        color={"purple.200"}
        onClick={() => navigate("/")}
      >
        home
      </Button>
      {isAuthenticated() && (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          leftIcon={
            <FontAwesomeIcon icon={faPenFancy} style={{ color: "#907dd4" }} />
          }
          onClick={() => navigate("/write")}
        >
          write
        </Button>
      )}
      <Spacer />
      {isAuthenticated() || (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
          onClick={() => navigate("/signup")}
        >
          signup
        </Button>
      )}
      {isAdmin() && (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          leftIcon={<FontAwesomeIcon icon={faUsers} />}
          onClick={() => navigate("/member/list")}
        >
          회원목록
        </Button>
      )}
      {isAuthenticated() && (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          leftIcon={
            <FontAwesomeIcon icon={faPerson} style={{ color: "#99c8e5" }} />
          }
          onClick={() => navigate("/member?" + urlParams.toString())}
        >
          {login.nickName} 님
        </Button>
      )}
      {isAuthenticated() || (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          leftIcon={
            <FontAwesomeIcon icon={faHeart} style={{ color: "#ee7cd5" }} />
          }
          onClick={() => navigate("/login")}
        >
          로그인
        </Button>
      )}
      {isAuthenticated() && (
        <Button
          borderRadius={0}
          variant="ghost"
          size="lg"
          leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      )}
    </Flex>
  );
}
