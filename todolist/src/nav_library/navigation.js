// Nav, completedNav, TodoNav의 중복된 코드를 function으로 정리합니다.
// 주 기능은 마지막 페이지 계산하기, prev, next 버튼 구현, 더했을 때 더해진 페이지로 focus, 빼는 경우 중에 마지막 페이지가 사라지는 경우 handle 이 있습니다.
// max list per page 가 정해진 페이지에 대해서 보여줄 list의 index 범위를 구해주는 rendering 기능도 있습니다.
// 이 library를 사용하면 페이지를 뚫고 리스트가 나가는 일이 없게 됩니다.