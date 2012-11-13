while (true)
do
  let COUNTER=0
  while [  $COUNTER -lt 40 ]; do
    echo $COUNTER
    test/send_test_data.sh&
    let COUNTER=COUNTER+1
  done
  echo "New batch"
  sleep 1
done
