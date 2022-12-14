import { Input, Flex } from "@chakra-ui/react";
import { Dispatch } from "react";
import { SubmitState } from "../../types/enums";
import { Student } from "@prisma/client";
const NewStudent = ({
  newStudent,
  setNewStudent,
  submit,
}: {
  newStudent: Student;
  setNewStudent: Dispatch<Student>;
  submit: SubmitState;
}) => {
  return (
    <Flex
      my="1rem"
      justifyContent="space-between"
      bgColor="rgb(181, 210, 240,0.15)"
      p="1rem"
      border="1px solid rgb(1, 0, 1, 0.2) "
      borderRadius="9px"
    >
      <Input
        placeholder="Id"
        size="md"
        maxW="300px"
        type="number"
        value={newStudent.id}
        onChange={(e) =>
          submit == SubmitState.INPUTTING &&
          setNewStudent({
            ...newStudent,
            id: parseInt(e.target.value),
          })
        }
      />
      <Input
        placeholder="Name"
        value={newStudent.name}
        onChange={(e) =>
          submit == SubmitState.INPUTTING &&
          setNewStudent({
            ...newStudent,
            name: e.target.value,
          })
        }
        size="md"
        maxW="300px"
      />
      <Input
        placeholder="Semester"
        size="md"
        maxW="300px"
        value={newStudent.semester}
        onChange={(e) =>
          submit == SubmitState.INPUTTING &&
          setNewStudent({
            ...newStudent,
            semester: e.target.value,
          })
        }
      />
    </Flex>
  );
};

export default NewStudent;
