-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Mentor" DROP CONSTRAINT "Mentor_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TimelineItem" DROP CONSTRAINT "TimelineItem_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "completionDateText",
DROP COLUMN "joinUrl",
DROP COLUMN "progressDone",
DROP COLUMN "progressInProgress",
DROP COLUMN "progressUpcoming",
DROP COLUMN "resultsUrl",
DROP COLUMN "stage",
DROP COLUMN "summary",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "mentor" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "recruitmentDate" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "progress" SET DEFAULT 0,
ALTER COLUMN "participants" SET DEFAULT 0,
ALTER COLUMN "seats" SET DEFAULT 0;

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "Mentor";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "TimelineItem";
