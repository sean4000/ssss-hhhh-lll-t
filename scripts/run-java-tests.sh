#!/usr/bin/env bash
# 编译并运行全部 Java 题目的测试（题目四 ~ 题目十）。
# 用法： bash scripts/run-java-tests.sh
set -u

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TOTAL_PASS=0
TOTAL_FAIL=0
STATUS=0

for name in 四 五 六 七 八 九 十; do
  DIR="$ROOT/题目$name"
  [ -d "$DIR" ] || continue

  case "$name" in
    四) SOURCES="Solution.java test/SolutionTest.java test/Time.java" ;;
    九) SOURCES="Solution.java test/SolutionTest.java test/Exponent.java" ;;
    *)  SOURCES="Solution.java test/SolutionTest.java" ;;
  esac

  echo "===== 题目$name ====="
  if ! ( cd "$DIR" && javac -d out $SOURCES ); then
    echo "编译失败：题目$name"
    STATUS=1
    continue
  fi

  OUTPUT="$( cd "$DIR" && java -cp out SolutionTest )"
  echo "$OUTPUT" | grep -E "^(FAIL|passed:)" || true
  LINE="$( echo "$OUTPUT" | grep -E "^passed:" | tail -1 )"
  PASSED="$( echo "$LINE" | sed -E 's/passed: ([0-9]+).*/\1/' )"
  FAILED="$( echo "$LINE" | sed -E 's/.*failed: ([0-9]+)/\1/' )"
  TOTAL_PASS=$((TOTAL_PASS + ${PASSED:-0}))
  TOTAL_FAIL=$((TOTAL_FAIL + ${FAILED:-0}))
  if [ "${FAILED:-1}" != "0" ]; then
    STATUS=1
  fi
done

echo
echo "===== 汇总 ====="
echo "Java 用例通过 $TOTAL_PASS 个，失败 $TOTAL_FAIL 个"
exit $STATUS
