-- CreateTable
CREATE TABLE "_MemberRooms" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MemberRooms_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MemberRooms_B_index" ON "_MemberRooms"("B");

-- AddForeignKey
ALTER TABLE "_MemberRooms" ADD CONSTRAINT "_MemberRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberRooms" ADD CONSTRAINT "_MemberRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
