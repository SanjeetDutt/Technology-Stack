package in.sanjeetdutt.M002_Design_Pattern.P002_Builder;
class Client{
    public static void main(String[] args) {

        Student studentA = Student.getBuilder()
                .setAge(18).setName("SANJEET").setPhone(123).build();

        Student studentB = Student.getBuilder()
                .setAge(20).setName("AYUSH").build();

//        Student StudentC = Student.getBuilder()
//                .setAge(21).setPhone(123).build();

    }
}

