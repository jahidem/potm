import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { useEffect } from 'react';
import { loadLogList } from '../../redux/slice/contest-slice';

const LogScreen = () => {
  const listLogs = useAppSelector((state) => state.contest.listLogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.api.readyLogList((event, value) => {
      dispatch(loadLogList(value));
    });

    window.api.loadLogListFromPotmWindow();
  },[]);

  return (
    <>
      {listLogs.length ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Spinner size="xl" color="blueviolet" speed="0.65s" />
        </Flex>
      ) : (
        listLogs.map((ele) => (
          <Flex my="1rem" flexDir="column">
            <Text>{ele.contest.id}</Text>
            <Text>{ele.reportRow.handle}</Text>
          </Flex>
        ))
      )}
    </>
  );
};

export default LogScreen;
