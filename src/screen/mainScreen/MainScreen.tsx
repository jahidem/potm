import {
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import NewStudent from "./NewStudent";
import { DocumentState, SubmitState } from "../../types/enums";
import { Student } from "@prisma/client";
import { deleteStudent } from "../../../core/lib/useCases";
import TopBar from "../components/TopBar";
const MainScreen = () => {
  const [submit, setSubmit] = useState<SubmitState>(SubmitState.NULL);
  const [deleteStudent, setDeleteStudent] = useState<Student>(null);
  const [docState, setDocState] = useState<DocumentState>(DocumentState.VIEW);
  const [newStudent, setNewStudent] = useState<Student>({
    id: undefined,
    name: "",
    semester: "",
  });
  const [studentList, setStudentList] = useState<Array<Student>>([
    {
      id: 2078,
      name: "Jahid",
      semester: "5",
    },
  ]);

  useEffect(() => {
    const addStudent = async () => {
      const student = await window.api.addStudent(newStudent);

      console.log(student);
      setSubmit(SubmitState.SUBMITTED);
    };

    if (submit == SubmitState.SUBMITTING) {
      addStudent();
    } else if (submit == SubmitState.SUBMITTED) {
      console.log("pop up");
      setNewStudent({
        id: undefined,
        name: "",
        semester: "",
      });
      setSubmit(SubmitState.NULL);
    }
  }, [submit]);

  useEffect(() => {
    const fetchStudentList = async () => {
      const allStudent = await window.api.findAllStudent();
      setStudentList(allStudent);
    };
    if ((studentList && !studentList.length) || submit == SubmitState.NULL) {
      fetchStudentList();
    }
  }, [submit, deleteStudent]);

  useEffect(() => {
    const removeStudent = async (data: Student) => {
      await window.api.deleteStudent(data);
    };
    if (deleteStudent != null) {
      removeStudent(deleteStudent);
      setDeleteStudent(null);
    }
  }, [deleteStudent]);

  return (
    <>
      <style>
        {`
         
         .no-select{
          -webkit-user-select: none; 
         }
        `}
      </style>
      <TopBar />
      <Flex
        className="no-select"
        flexDir="column"
        maxW="1300px"
        mx="auto"
        my="2rem"
        px="1rem"
        height="100%"
      >
        <Flex width="350px" alignSelf="flex-end" justifyContent="space-between">
          <Button
            onClick={() => {
              if (submit == SubmitState.NULL) setSubmit(SubmitState.INPUTTING);
              else if (submit == SubmitState.INPUTTING)
                setSubmit(SubmitState.SUBMITTING);
            }}
            isLoading={submit == SubmitState.SUBMITTING}
          >
            {submit == SubmitState.NULL ? "Add  student" : "Submit"}
          </Button>

          {submit == SubmitState.INPUTTING && (
            <Button
              colorScheme="linkedin"
              onClick={() => {
                setSubmit(SubmitState.NULL);
              }}
            >
              Cancle
            </Button>
          )}
          <Box>
            <Button
              colorScheme="gray"
              variant="outline"
              onClick={() => {
                docState == DocumentState.VIEW
                  ? setDocState(DocumentState.EDITING)
                  : setDocState(DocumentState.VIEW);
              }}
            >
              {docState == DocumentState.VIEW ? "Edit" : "View"}
            </Button>
            <Button
              mx="1rem"
              colorScheme="gray"
              variant="outline"
              onClick={() => window.api.printWebContent()}
            >
              Print
            </Button>
          </Box>
        </Flex>

        {(submit == SubmitState.INPUTTING ||
          submit == SubmitState.SUBMITTING) && (
          <NewStudent
            newStudent={newStudent}
            setNewStudent={setNewStudent}
            submit={submit}
          />
        )}

        <TableContainer
          maxW="1500px"
          minW="500px"
          textAlign="center"
          my="2rem"
          height="100%"
          overflowY="scroll"
        >
          <Table variant="striped" colorScheme="linkedin">
            <TableCaption placement="top" fontSize="lg">
              Strudent Infos
            </TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th isNumeric>semester</Th>
                {docState == DocumentState.EDITING && <Th>Action</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {studentList.map((student: Student) => (
                <Tr key={student.id}>
                  <Td>{student.id}</Td>
                  <Td>{student.name}</Td>
                  <Td isNumeric>{student.semester}</Td>
                  {docState == DocumentState.EDITING && (
                    <Td>
                      <Button
                        colorScheme="purple"
                        size="sm"
                        onClick={() => setDeleteStudent(student)}
                      >
                        delete
                      </Button>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default MainScreen;
